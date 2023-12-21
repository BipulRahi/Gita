import { ChatBotcanvas } from "@/components/ChatBotcanvas";
import { TextToSpeech } from "../components/TextToSpeech";
import { IsPlayProvider } from "./context/context";

export default function Home() {
	return (
		<main className="h-screen ">
			<IsPlayProvider>
			<ChatBotcanvas/>
			<TextToSpeech/>
			</IsPlayProvider>
		</main>
	);
}
