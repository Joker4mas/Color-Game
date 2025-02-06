import type { MetaFunction } from "@remix-run/node";
import GuessColor from "../components/GuessColor";

export const meta: MetaFunction = () => {
  return [
    { title: "Color Guess" },
    { name: "description", content: "Color Games" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <GuessColor />
    </div>
  );
}
