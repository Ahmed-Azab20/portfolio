/**
 * Console Ledger component: calm, accessible terminal interaction for Ahmed Azab's infrastructure identity.
 */
import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, TerminalSquare } from "lucide-react";

type TerminalLine = { command?: string; output: string[] };

const initialHistory: TerminalLine[] = [
  { command: "whoami", output: ["Ahmed Azab", "Network Engineering student · aspiring System Administrator"] },
  { command: "focus", output: ["Linux  |  Networking  |  Infrastructure"] },
  { command: "goal", output: ["System Administration  →  DevOps"] },
];

const responses: Record<string, string[]> = {
  whoami: ["Ahmed Azab", "Network Engineering student · aspiring System Administrator"],
  role: ["System Administration / Infrastructure", "Currently preparing for internship opportunities."],
  focus: ["Linux  |  Networking  |  Infrastructure"],
  skills: ["Linux Administration · Networking / CCNA", "VMware · AlmaLinux · Cisco Packet Tracer", "Bash · Git · MySQL · System Services"],
  "ls skills": ["linux/  networking/  system-administration/", "virtualization/  automation/  cloud/"],
  journey: ["Now: Network Engineering student", "Building: Linux + System Administration", "Direction: Infrastructure + Cloud + DevOps"],
  certs: ["4 verified Coursera certificates", "DevOps · Cloud Computing · Linux Server Management · Agile & Scrum"],
  contact: ["email: azab95320@gmail.com", "github: github.com/Ahmed-Azab20", "linkedin: linkedin.com/in/ahmed-azab-it"],
  help: ["Available: whoami, role, focus, skills, ls skills, journey, certs, contact, clear"],
};

export default function PortfolioTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function runCommand(event: FormEvent) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setHistory([]);
    } else if (command === "contact") {
      setHistory((current) => [...current, { command, output: responses.contact }]);
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setHistory((current) => [
        ...current,
        { command, output: responses[command] ?? [`command not found: ${command}`, "Try `help` to see available commands."] },
      ]);
    }
    setInput("");
  }

  return (
    <div className="terminal-shell" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-topbar">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <span><TerminalSquare size={14} /> ahmed@infra:~</span>
        <span className="terminal-status">connected</span>
      </div>
      <div className="terminal-body" aria-label="Interactive terminal. Type help to see commands.">
        <div className="terminal-intro"><span>●</span> Interactive profile shell · type <b>help</b></div>
        {history.map((item, index) => (
          <div className="terminal-entry" key={`${item.command ?? "boot"}-${index}`}>
            {item.command && <div className="terminal-command"><em>ahmed@infra</em><b>:</b><span>~</span><b>$</b> {item.command}</div>}
            {item.output.map((line, lineIndex) => <p key={`${line}-${lineIndex}`}>{line}</p>)}
          </div>
        ))}
        <form className="terminal-input-line" onSubmit={runCommand}>
          <label htmlFor="terminal-command"><em>ahmed@infra</em><b>:</b><span>~</span><b>$</b></label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
            aria-label="Enter terminal command"
          />
        </form>
      </div>
      <a className="terminal-footer" href="#journey">Explore the journey <ArrowUpRight size={15} /></a>
    </div>
  );
}
