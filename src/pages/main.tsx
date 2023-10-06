import { useMutation, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import axios from "axios";
import { useRef, useState } from "react";

const MainPage = () => {
    const [result, setResult] = useState<number | undefined | string>(
        undefined
    );
    const number1Ref = useRef<HTMLInputElement>(null);
    const number2Ref = useRef<HTMLInputElement>(null);
    const additionMutation = useMutation({
        mutationFn: async () => {
            return (await invoke("substraction", {
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
    const { data } = useQuery({
        queryFn: async () => {
            const res = await axios.get("http://127.0.01:4875/");
            return res.data as string;
        },
        queryKey: ["helloWorld"],
        cacheTime: 5,
    });

    return (
        <div className="overflow-hidden">
            {data}
            <form
                className="flex flex-col gap-2 mt-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    additionMutation.mutate();
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
                <button type="submit" className="bg-blue-500">
                    Substraction
                </button>
            </form>
            {result && <p>{result}</p>}
        </div>
    );
};
export default MainPage;
