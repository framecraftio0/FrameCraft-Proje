

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: 'html' | 'css' | 'json';
    placeholder?: string;
}

export default function CodeEditor({ value, onChange, language, placeholder }: CodeEditorProps) {
    return (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden font-mono text-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide flex justify-between items-center">
                <span>{language}</span>
                <span className="text-[10px] text-gray-400">Editor</span>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-64 p-4 outline-none resize-none bg-white font-mono text-sm leading-relaxed"
                placeholder={placeholder}
                spellCheck={false}
            />
        </div>
    );
}
