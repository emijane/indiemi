import React, { useState } from "react";

export default function HackerTitle() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            if (value.trim().toLowerCase() === "enter") {
                // navigate to your portfolio page
                window.location.href = "/portfolio";
            } else {
                // show terminal-style error
                setError(`command not found: ${value}`);
                setValue("");
            }
        }
    }

    return (
        <div className="min-h-[200px] w-full flex items-center justify-center p-6">
            <div className="relative w-full max-w-xl bg-black/95 border border-green-700/30 rounded-md shadow-lg p-6 font-mono text-green-400">
                {/* Big title */}
                <div>
                    <h1 className="ascii-glow text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider leading-tight">EMMA DENUNZIO</h1>
                </div>

                {/* System logs */}
                <div className="text-xs text-green-300/80 space-y-1 mb-4">
                    <p>[ OK ] Secure shell initialized.</p>
                    <p>[ OK ] Portfolio directory mounted.</p>
                    <p>[ … ] Awaiting input…</p>
                </div>

                {/* Input prompt */}
                <div className="flex items-center text-green-300">
                    <span className="mr-2">emma@portfolio:~$</span>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="type ENTER"
                        className="flex-1 bg-transparent outline-none placeholder:text-green-600"
                    />
                </div>

                {/* Terminal-style error output */}
                {error && (
                    <div className="mt-2 text-red-500 text-xs">{error}</div>
                )}
            </div>
        </div>
    );
}
