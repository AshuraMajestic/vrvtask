import { cn } from "@/lib/utils";

type Props<T> = {
    className?: string;
    type?: "text" | "number" | "email"; // Support email as a string type
    label?: string;
    placeholder?: string;
    id?: string;
    state: T; // Generic state type
    setState: React.Dispatch<React.SetStateAction<T>>; // Generic setState type
    isReplace?: boolean;
};

const InputBox = <T extends string | number>({
    className,
    type = "text",
    label,
    placeholder,
    id,
    state,
    setState,
    isReplace = false,
}: Props<T>) => {
    return (
        <div>
            <label
                htmlFor={id}
                className={cn(
                    "block text-white/70 mb-1 pl-1 text-sm ",
                    isReplace && "text-white",
                )}
            >
                {label}
            </label>
            <input
                value={state}
                onChange={(e) => {
                    const value =
                        type === "number"
                            ? e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            : e.target.value;
                    setState(value as T);
                }}
                required
                id={id}
                type={type}
                placeholder={placeholder}
                className={cn(
                    "bg-white text-black border border-boxBorderColor rounded-xl w-80 md:w-80 h-12 px-3 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
                    className,
                )}
            />
        </div>
    );
};

export default InputBox