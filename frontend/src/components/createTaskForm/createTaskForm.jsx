import { Input } from "../ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CreateTaskSchema } from "@/schema/createTask.schema.js";
import { useCreateTask } from "@/hooks/useCreateTask.hook.js";
import { Toaster } from "../ui/toaster.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { useQueryClient } from "@tanstack/react-query"; 

export function CreateTaskForm(){

    const [date, setDate] = useState();
    const {mutate, isError, isSuccess, isPending} = useCreateTask();
    const {toast} = useToast();
    const queryClient = useQueryClient(); 

    const form = useForm({
        resolver: zodResolver(CreateTaskSchema),
    });

    function onSubmit(values){
        let dueDate = values.dueDate.toISOString();
        mutate({...values, dueDate});
        form.reset();
        queryClient.invalidateQueries({    // this is used to add the task immediately to the frontend once the submit button is clicked 
            queryKey: ["fetchTasks"], //this fetchTask is taken from useFetchTask.hook.js 
            refetchType: "all",
        });
    };

    useEffect(()=>{
        if(isSuccess){
            toast({
                title: "New task is created",
            });
        }
    }, [isSuccess]);

    useEffect(()=>{
        if(isError){
            toast({
                title: "Your request failed",
                description: "Please try again",
                variant: "destructive",
            });
        }
    }, [isError]);

    return (
        <div>
            <h2 className="text-xl mb-4" >Create a new Task</h2>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="py-2">
                        <FormField
                            control = {form.control}
                            name="title"
                            render = {({field, fieldState})=>(
                                <FormItem >
                                    <FormControl>
                                        <Input type="text" placeholder="Task Title" {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between py-2">
                        <div className="w-full mr-2">

                            <FormField
                                control = {form.control}
                                name="status"
                                render = {({field, fieldState})=>(
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="todo">Todo</SelectItem>
                                                <SelectItem value="inProgress">In Progress</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                            {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                        </Select>    
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="w-full ml-2">

                            <FormField
                                control = {form.control}
                                name="priority"
                                render = {({field, fieldState})=>(
                                    <FormItem >
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="low">Low</SelectItem>
                                                    <SelectItem value="high">High</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                            {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                        </Select>    
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field, fieldState }) => (
                                <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal",!date && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a due date</span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="py-2">
                        <FormField
                            control = {form.control}
                            name="description"
                            render = {({field, fieldState})=>(
                                <FormItem >
                                    <FormControl>
                                        <Textarea placeholder="Description of the task" {...field} />
                                    </FormControl>
                                    {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="py-2 flex justify-end">
                        <Button type="submit">Create Task</Button>
                    </div>
                </form>
            </Form>
            <Toaster/>
        </div>
    );
}