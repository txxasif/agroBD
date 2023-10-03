import { Button, ButtonProps } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
export const SpinnerButton = ({ isLoading, name, ...props }) => {
    return (
        <>
            {
                isLoading ? (<Button disabled className="w-full">
                    <ReloadIcon className=" mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>) :
                    (
                        <Button className=" w-full" type="submit">{name}</Button>
                    )
            }
        </>
    )
}
