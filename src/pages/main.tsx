import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { useRef, useState } from "react";

const MainPage = () => {
    const [result, setResult] = useState<number | undefined | string>(
        undefined
    );
    const number1Ref = useRef<HTMLInputElement>(null);
    const number2Ref = useRef<HTMLInputElement>(null);
    const greetMutation = useMutation({
        mutationFn: async () => {
            return (await invoke("addition", {
                number1: number1Ref.current?.valueAsNumber,
                number2: number2Ref.current?.valueAsNumber,
            })) as number;
        },
        onSuccess: (value) => {
            setResult(value);
        },
        onError: (err: string) => {
            setResult(err);
        },
    });
    return (
        <div className="overflow-hidden">
            <form
                className="flex flex-col gap-2 mt-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    greetMutation.mutate();
                }}
            >
                <div className="flex flex-row gap-2">
                    <label>Number 1</label>
                    <input
                        className="border-2 border-yellow-500"
                        type="number"
                        placeholder="insert number"
                        ref={number1Ref}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <label>Number 2</label>
                    <input
                        className="border-2 border-yellow-500"
                        type="number"
                        placeholder="insert number"
                        ref={number2Ref}
                    />
                </div>
                <button type="submit">Addition</button>
            </form>
            {result && <p>{result}</p>}
        </div>
    );
};
export default MainPage;
