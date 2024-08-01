"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import { Label } from '@/components/ui/label';
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
//import { useRouter } from "next/router"

export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECHBOX = 'ckeckbox',
    DATE_PICKER = 'datepicker',
    SELECT = 'select',
    SKELETON = 'skeleton'

}
 

export const  PatientForm = () => {
    const router =useRouter();
  // 1. Define your form.
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
        const userData = { name, email, phone };
        const user = await createUser(userData);
        if (user) {
            router.push(`/patients/${user.$id}/register`);
        } else {
            console.error("User creation failed, no user returned");
        }
    } catch (error) {
        console.error("Error during user creation:", error);
    } finally {
        setIsLoading(false);
    }
}

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Welcome 🧑‍⚕️</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
        fieldType ={FormFieldType.INPUT}
        name="name"
        label ="Full Name"
        placeholder = "enter your name"
        iconSrc = "/assets/icons/user.svg"
        iconAlt = "user"

        control = {form.control}
        />
        <CustomFormField 
        fieldType ={FormFieldType.INPUT}
        name="email"
        label ="Email"
        placeholder = "youremail@gmail.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "email"

        control = {form.control}
        />
        <CustomFormField 
        fieldType ={FormFieldType.PHONE_INPUT}
        name="phone"
        label ="Phone Number"
        placeholder = "99999 99999"

        control = {form.control}
        />
      
      <SubmitButton isLoading ={isLoading} >Get Started</SubmitButton>
    </form>
  </Form>

  )
}

export default PatientForm
