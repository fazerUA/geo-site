import Link from "next/link";
import type { AboutMessenger } from "@/content/about/page-content";
import { MaxIcon, TelegramIcon, ThreadsIcon } from "@/components/about/messenger-icons";

type Props = {
  messengers: AboutMessenger[];
};

function MessengerIcon({ type }: { type: AboutMessenger["type"] }) {
  if (type === "telegram") {
    return <TelegramIcon className="h-5 w-5 shrink-0" />;
  }

  if (type === "threads") {
    return <ThreadsIcon className="h-5 w-5 shrink-0" />;
  }

  return <MaxIcon className="h-5 w-5 shrink-0" />;
}

function messengerAriaLabel(type: AboutMessenger["type"]): string {
  if (type === "telegram") {
    return "Telegram";
  }

  if (type === "threads") {
    return "Threads";
  }

  return "MAX";
}

export function SpecialistContacts({ messengers }: Props) {
  if (messengers.length === 0) {
    return null;
  }

  return (
    <div className="about-specialist-contacts">
      {messengers.map((messenger) => (
        <ul key={messenger.type} className="about-specialist-messenger-links">
          {messenger.links.map((link) => (
            <li key={link.href} className="about-specialist-contact-row">
              <span
                className={`about-specialist-messenger-icon about-specialist-messenger-icon--${messenger.type}`}
                aria-hidden="true"
              >
                <MessengerIcon type={messenger.type} />
              </span>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about-specialist-contact-link"
                aria-label={`${messengerAriaLabel(messenger.type)}: ${link.label}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
