"use server";
import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const { data, error, success } = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      message: "Missing fields failed to create invoice",
    };
  }

  const { amount, customerId, status } = data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    return { message: "Database Error: Failed to create Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const { data, error, success } = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      message: "Missing fields failed to update invoice",
    };
  }

  const { amount, status, customerId } = data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
  revalidatePath("/dashboard/invoices");
}

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
}

const signUpSchema = z.object({
  email: z.string().email({
    message: "Email is field required.",
  }),
  password: z.string({
    message: "password is field required.",
  }).min(6,"password must be 6 characters.").max(6,"password must be 6 characters.")
})

export async function signUp(prevState: SignUpState,formData: FormData) {
  const { data, error, success } = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      message: "Missing fields failed to sign up",
    };
  }

  try {
    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await sql `INSERT INTO users (email, password) VALUES(${email}, ${hashedPassword})`

  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign up please try again")
  }

  redirect("/login");
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const customerFormSchema = z.object({
  email: z.string().email({
    message: "Email is field required.",
  }),
  name: z.string({
    message: "Name field is required.",
  }),
  image_url: z.string({
    message: "image_url field is required.",
  }),
});

export type CustomerState = {
  errors?: {
    email?: string[];
    name?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export const createCustomer = async (
  prevState: CustomerState,
  formData: FormData
) => {
  const { success, data, error } = customerFormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("username"),
    image_url: formData.get("image_url"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      message: "Missing fields failed to create customer",
    };
  }

  try {
    const { email, name, image_url } = data;

    await sql`INSERT INTO customers (name,email,image_url) VALUES (${name},${email},${image_url})`;
  } catch (error) {
    throw new Error("Failed to create a new customer");
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const updateCustomer = async (
  id: string,
  prevState: CustomerState,
  formData: FormData
) => {
  const { success, data, error } = customerFormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("username"),
    image_url: formData.get("image_url"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      message: "Missing fields failed to create customer",
    };
  }

  try {
    const { email, name, image_url } = data;

    await sql`
    UPDATE customers 
    SET email = ${email}, name = ${name}, image_url = ${image_url} 
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("Failed to update customer");
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export async function deleteCustomer(id: string) {
  try {
    await sql`
      DELETE FROM customers
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
  revalidatePath("/dashboard/customers");
}
