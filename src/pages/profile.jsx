import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { z } from 'zod';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Toaster } from "@/components/ui/toaster"
import api from '../libs/api'

// form validation
const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
	mobile: z.string().min(2, { message: 'This field has to be filled.' }).regex(new RegExp(/^1[0-9]{10}$/), { message: 'This is not a valid mobile number' }),
});

const Profile = () => {
	const [edit, setEdit] = useState(false)
	const [laoding, setLoading] = useState(false)
	const { toast } = useToast()

	// api for saving
	async function saveProfile(profile) {
		const { data } = await api.post('/api/profile/save', profile)
		return data
	}

	// if the state becomes editable, forcus first field of form, when dom renders end. 
	useEffect(() => {
		if (edit) {
			form.setFocus('username')
		}
	}, [edit])

	// set default value in order to simulate user logging in.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: 'test',
			email: 'test@gmail.com',
			mobile: '12345678901',
		},
	});

	const onSubmit = (values) => {
		setLoading(true)
		saveProfile(values).then((data) => {
			setLoading(false)
			if (data.code !== 200) {
				toast({
					variant: "destructive",
					title: "Request Error",
					description: data.message,
				})

			} else {
				toast({
					title: "Request Success",
					description: data.message,
				})
				setEdit(false)
			}
		})
	}
	function onEdit() {
		setEdit(true)
	}

	function onCancle() {
		setEdit(false)
	}
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="name" {...field} disabled={!edit} />
								</FormControl>
								<FormDescription>
									This is your name. At least 2 characters.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="This is your Email." {...field} disabled={!edit} />
								</FormControl>
								<FormDescription>
									Enter your email like xxxx@yyy
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mobile"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mobile</FormLabel>
								<FormControl>
									<Input placeholder="This is your mobile number." {...field} disabled={!edit} />
								</FormControl>
								<FormMessage />
								<FormDescription>
									Only supports mobile phone numbers in China
								</FormDescription>
							</FormItem>
						)}
					/>
					{
						edit ?
							<div className='flex justify-around'>
								<Button type='button' onClick={onCancle} disabled={laoding}>Cancle</Button>
								<Button type='submit' disabled={laoding}>Submit</Button>
							</div> :

							<div className="text-center">
								<Button type='button' onClick={onEdit}>Edit</Button>
							</div>
					}
				</form>
			</Form>
			<Toaster />
		</>
	);
}

export default Profile