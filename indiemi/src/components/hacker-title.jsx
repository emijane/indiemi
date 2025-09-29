import React, { useEffect, useRef, useState } from "react";

export default function HackerTitle() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState([
        "[    0.002001] Secure Shell Service started.",
        "[    0.014883] Portfolio directory mounted at /home/emma/portfolio",
        "[    0.207430] Initialization complete. Awaiting input…",
    ]);
    const [dots, setDots] = useState("");
    const dotsRef = useRef(null);

    function pushLog(line) {
        setLogs((l) => {
            const next = [...l];
            if (next[next.length - 1].includes("Awaiting input") && line.startsWith(">")) {
                next.pop();
            }
            next.push(line);
            return next;
        });
    }

    function startLoadingAndRedirect() {
        setIsLoading(true);
        setError("");
        setValue("");

        // animated dots
        dotsRef.current = setInterval(() => {
            setDots((d) => (d.length >= 3 ? "" : d + "."));
        }, 400);

        // show staged logs
        pushLog("> executing: open /portfolio");

        // after typing ENTER
        setTimeout(() => pushLog("[ 0.002001] Secure Shell Service started."), 600);
        setTimeout(
            () =>
                pushLog(
                    "[ 0.014883] Portfolio directory mounted at /home/emma/portfolio"
                ),
            1200
        );
        setTimeout(
            () =>
                pushLog(
                    "[ 0.207430] Initialization complete. Redirecting to portfolio…"
                ),
            2000
        );
        setTimeout(() => {
            window.location.href = "/portfolio";
        }, 2800);

        // stop animation and redirect
        setTimeout(() => {
            if (dotsRef.current) clearInterval(dotsRef.current);
            setDots("");
            pushLog("[ OK ] Done. Redirecting to /portfolio");
            // tiny delay for users to see final message
            setTimeout(() => {
                window.location.href = "/portfolio";
            }, 350);
        }, 3000);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            const trimmed = value.trim();
            if (trimmed.toLowerCase() === "enter") {
                startLoadingAndRedirect();
            } else {
                setError(`command not found: ${trimmed || "<empty>"}`);
                setValue("");
            }
        }
    }

    // cleanup interval if component unmounts
    useEffect(() => {
        return () => {
            if (dotsRef.current) clearInterval(dotsRef.current);
        };
    }, []);

    return (
        <div className="min-h-[200px] w-full flex items-center justify-center p-6 font-mono">
            
            <div className="relative w-full max-w-xl bg-black/95 border border-green-600/30 rounded-md shadow-lg py-10 px-7 text-green-400">
                <div className="absolute top-0 left-0 w-full h-7 bg-green-600/20 border-b border-green-600/30 rounded-t-md">
                    <span className="absolute top-2 left-3 text-green-300 text-xs select-none">user@terminal: ~</span>
                    <span className="absolute top-2 right-3 text-green-300 text-xs select-none">v2.0.1</span>
                </div>
                <span className="absolute bottom-2 right-3 text-green-300/50 text-xs select-none">github.com/emijane</span>
                <pre className="ascii-glow text-sm sm:text-base md:text-lg tracking-wider leading-tight">
{String.raw` ________  ______  ___  ___  
|  ___|  \/  ||  \/  | / _ \ 
| |__ | .  . || .  . |/ /_\ \
|  __|| |\/| || |\/| ||  _  |
| |___| |  | || |  | || | | |
\____/\_|  |_/\_|  |_/\_| |_/`}
                </pre>

                <div
                    className="text-xs text-green-300/80 space-y-1 mb-4 mt-2"
                    aria-live="polite"
                >
                    {logs.map((line, i) => (
                        <div key={i}>
                            {line}
                            {/* attach the animated dots to the last ephemeral log during loading */}
                            {isLoading && i === logs.length - 1 && dots ? <span>{dots}</span> : null}
                        </div>
                    ))}
                    {/* if loading, show a visible "Loading" line too */}
                    {isLoading ? <div>[ ... ] Working{dots}</div> : null}
                </div>

                {/* input prompt */}
                <div className="flex items-center text-green-300">
                    <span className="mr-2">user@portfolio:~$</span>
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
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        aria-label="terminal input"
                        autoFocus
                    />
                </div>

                {/* error output */}
                {error && <div className="mt-2 text-red-500 text-xs">{error}</div>}
            </div>
        </div>
    );
}
