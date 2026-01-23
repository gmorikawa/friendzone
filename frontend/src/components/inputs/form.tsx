import type { FormController } from "./form-controller";

export interface FormProps<Data> {
    controller: FormController<Data>;
}

export function Form<Data>(props: React.PropsWithChildren<FormProps<Data>>) {
    const { controller, children } = props;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        controller.makeAllTouched();

        if (controller.isValid) {
            controller.handleSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
}
