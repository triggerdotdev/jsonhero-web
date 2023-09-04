import { Body } from "./Primitives/Body";
import { useState } from "react";

export function FieldNotes() {

    const [value, setValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
    }

    return (
        <div>
            <Body>Test</Body>
            <textarea
                value={value}
                onChange={handleChange}
                style={{
                    fontFamily: "monospace",
                    color: "white",
                    backgroundColor: "#101728",
                    border: "1px solid #FF0000",
                    width: "100%",
                    height: "200px",
                    padding: "10px",
                    outline: "none"
                }}
            />
        </div>
    );
}
 
