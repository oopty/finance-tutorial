import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
 } from "@/components/ui/sheet";
 import { AccountForm } from "./account-form";
 import { insertAccountSchema } from "@/db/schema";
 import {  } from "@/features/accounts/hooks/use-new-account";
 import { useGetAccount } from "@/features/accounts/api/use-get-account";
 import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
 import { useCreateAccount } from "@/features/accounts/api/use-create-account";
 
 const formSchema = insertAccountSchema.pick({
     name: true,
 })
 type FormValues = z.input<typeof formSchema>;

 export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const accountQuery = useGetAccount(id);
    const mutation = useCreateAccount();

    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,
    } : {
        name: ""
    };
    
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
                {isLoading ? 
                (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground" />
                    </div>    
                ): (
                    <AccountForm 
                        onSubmit={onSubmit} 
                        disabled={mutation.isPending}
                        defaultValues={defaultValues}// 요걸 빼면 왜 에러가 나지?
                    />
                )}
            </SheetContent>
        </Sheet>
    )
 }