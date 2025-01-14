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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react'

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
	mobile: z.string().min(2, { message: 'This field has to be filled.' }).regex(new RegExp(/^1[0-9]{10}$/), { message: 'This is not a valid mobile number' }),
});

const Profile = () => {
	const [edit, setEdit] = useState(false)
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: 'test',
			email: 'test@gmail.com',
			mobile: '12345678901',
		},
	});
	function onSubmit(values) {
		console.log(values)
	}
	function onEdit() {
		form.setFocus('username')
		setEdit(true)
	}

	function onCancle() {
		setEdit(false)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoFocus>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} disabled={!edit}/>
							</FormControl>
							<FormDescription>
								This is your public display name. At least 2 characters.
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
								<Input placeholder="This is your Email." {...field} disabled={!edit}/>
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
							<Button onClick={onCancle}>Cancle</Button>
							<Button type='submit'>Submit</Button>
						</div> :

						<div className="text-center">
							<Button onClick={onEdit}>Edit</Button>
						</div>
				}
			</form>
		</Form>
	);
}

export default Profile