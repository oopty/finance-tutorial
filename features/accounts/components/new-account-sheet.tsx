import { z } from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
 } from "@/components/ui/sheet";
 import { AccountForm } from "./account-form";
 import { insertAccountSchema } from "@/db/schema";
 import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
 import { useCreateAccount } from "@/features/accounts/api/use-create-account";
 
 const formSchema = insertAccountSchema.pick({
     name: true,
 })
 type FormValues = z.input<typeof formSchema>;

 export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactionds.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                    onSubmit={onSubmit} 
                    disabled={mutation.isPending}
                    defaultValues={{ // 요걸 빼면 왜 에러가 나지?
                        name: "",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
 }