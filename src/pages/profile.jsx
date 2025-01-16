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
	const [profile, setProfile] = useState({})
	const { toast } = useToast()

	// api for saving
	async function saveProfile(profile) {
		const { data } = await api.post('/api/profile/save', profile)
		return data
	}

	// api for getting profile. It's hard code, so keep this function simple.
	async function getProfile() {
		const {data} = await api.get('/api/profile/1')
		return data.data
	}

	const setFormValues = (data) => {
			form.setValue('username', data.username)
			form.setValue('email', data.email)
			form.setValue('mobile', data.mobile)

	}

	// get user profile when page has loaded
	useEffect(() => {
		getProfile().then((data) => {
			setProfile(data)
			setFormValues(data)
		})
	}, [])

	// if the state becomes editable, focus first field of form, when dom renders end. 
	useEffect(() => {
		if (edit) {
			form.setFocus('username')
		}
	}, [edit])

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (values) => {
		setLoading(true)
		saveProfile({...values, id: "1"}).then((data) => {
			setLoading(false)
			if (data.code !== 200) {
				toast({
					variant: "destructive",
					title: "Request Error",
					description: data.message,
				})

			} else {
				setProfile({...values, id: "1	"})
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
		setFormValues(profile)
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
								<FormLabel className="text-xs sm:text-sm">Username</FormLabel>
								<FormControl>
									<Input className="text-xs sm:text-sm" placeholder="name" {...field} disabled={!edit} />
								</FormControl>
								<FormDescription className="text-[0.7rem] sm:text-[0.8rem]">
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
								<FormLabel className="text-xs sm:text-sm">Email</FormLabel>
								<FormControl>
									<Input className="text-xs sm:text-sm" placeholder="This is your Email." {...field} disabled={!edit} />
								</FormControl>
								<FormDescription className="text-[0.7rem] sm:text-[0.8rem]">
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
								<FormLabel className="text-xs sm:text-sm">Mobile</FormLabel>
								<FormControl>
									<Input className="text-xs sm:text-sm" placeholder="This is your mobile number." {...field} disabled={!edit} />
								</FormControl>
								<FormMessage />
								<FormDescription className="text-[0.7rem] sm:text-[0.8rem]">
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