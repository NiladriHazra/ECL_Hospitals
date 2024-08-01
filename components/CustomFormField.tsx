'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from './ui/select'
import { SelectContent, SelectValue } from './ui/select'
import { SelectTrigger } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='IN'
                        placeholder={placeholder}
                        international
                        value={field.value}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
        
        case FormFieldType.DATE_PICKER:
            return(
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image 
                    src={"/assets/icons/calendar.svg"}
                    height={24}
                    width={24}
                    alt='calender'
                    className='ml-2'
                    />

                <FormControl>
                <DatePicker 
                selected={field.value || null} 
                onChange={(date) => field.onChange(date)} 
                dateFormat={dateFormat ??
                    'MM/dd/yyyy'}
                    showTimeSelect={showTimeSelect ?? false}
                    timeInputLabel = "Time:"
                    wrapperClassName="date-picker"
                />
                
                </FormControl>
                
                </div>
            )
        case FormFieldType.SKELETON:
            return(
                renderSkeleton ? renderSkeleton(field) : null
            )
        case FormFieldType.SELECT:
                return (
                  <FormControl>
                    <Select onValueChange={field.onChange} 
                    defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="shad-select-trigger">
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="shad-select-content">
                        {props.children}
                      </SelectContent>
                    </Select>
                  </FormControl>
                );
        
        case FormFieldType.TEXTAREA:
            return(
                <FormControl>
                    <Textarea
                    placeholder={placeholder}
                    {...field}
                    className='shad-textArea'
                    disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.CHECHBOX:
            return(
                <FormControl>
                    <div className='flex items-center'>
                        <Checkbox 
                        id={props.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                        <label 
                        htmlFor="props.name" 
                        className='checkbox-label ml-2'>
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECHBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField
                        field={field} props={props}
                    />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField
