import { TriangleAlert, CheckCircle } from "lucide-react";

interface FormStateMessageProps {
  message?: string;
  type?: string;
}

export default function FormStateMessage({
  message,
  type,
}: FormStateMessageProps) {
  if (!message && !type) return undefined;
  return (
    <>
      <div
        className={`${
          type === "success"
            ? "bg-emerald-500/15 text-emerald-500"
            : "bg-destructive/15 text-destructive"
        } flex items-center gap-x-2 rounded-md p-3 text-sm`}
      >
        {type === "success" ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <TriangleAlert className="h-5 w-5" />
        )}
        <p>{message}</p>
      </div>
    </>
  );
}
