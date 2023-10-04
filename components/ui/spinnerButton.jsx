import { Button, ButtonProps } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
export const SpinnerButton = ({ onClick, isLoading, name, ...props }) => {
    return (
        <>
            {
                isLoading ? (<Button disabled {...props}>
                    <ReloadIcon className=" mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>) :
                    (
                        <Button {...props} onClick={onClick} type="submit">{name}</Button>
                    )
            }
        </>
    )
}
