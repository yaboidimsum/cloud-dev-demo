import React from "react";
import {
  BannedIcon,
  DangerIcon,
  FaceIDIcon,
  // LockIcon,
  PassIcon,
  // PhraseIcon,
  // RecoveryPhraseIcon,
  ShieldIcon,
  // WarningIcon,
} from "./icons";
import clsx from "clsx";
import {
  KeyRound,
  ScrollText,
  ShieldAlert,
  VenetianMask,
  BookLock,
} from "lucide-react";

// ---- Shared types ----
type ViewType = "default" | "key" | "phrase" | "remove";

// ---- Button ----
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      data-vaul-no-drag=""
      className="focus-visible:shadow-focus-ring-button flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 active:scale-95 md:font-medium"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ---- SecondaryButton ----
interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SecondaryButton({
  children,
  onClick,
  className,
}: SecondaryButtonProps) {
  return (
    <button
      data-vaul-no-drag=""
      className={clsx(
        "focus-visible:shadow-focus-ring-button flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 active:scale-95 md:font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ---- Header ----
interface HeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Header({ icon, title, description }: HeaderProps) {
  return (
    <header className="mt-[21px]">
      {icon}
      <h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium">
        {title}
      </h2>

      <p className="mt-3 text-[17px] font-medium leading-[24px] text-[#999999] md:font-normal">
        {description}
      </p>
    </header>
  );
}

// ---- Phrase ----
interface ViewProps {
  setView: (view: ViewType) => void;
}

export function Phrase({ setView }: ViewProps) {
  return (
    <div>
      <div className="px-2">
        <Header
          icon={<VenetianMask />}
          title="Secret Recovery Phrase"
          description="Your Recovery Digits let you restore your wallet. Keep them private and secure."
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6">
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <ShieldIcon />
            Store your Recovery Digits safely
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <PassIcon />
            Never share your Recovery Digits
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <BannedIcon />
            Lost digits cannot be recovered
          </li>
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#F0F2F4] text-[#222222]"
        >
          Cancel
        </SecondaryButton>
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#4DAFFF] text-[#FFFFFF]"
        >
          <FaceIDIcon />
          Reveal
        </SecondaryButton>
      </div>
    </div>
  );
}

// ---- Key ----
export function Key({ setView }: ViewProps) {
  return (
    <div>
      <div className="px-2">
        <Header
          icon={<BookLock />}
          title="Private Key"
          description="Private key is used to restore your wallet. Keep it secure."
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6">
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <ShieldIcon />
            Store your private key securely
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <PassIcon />
            Never reveal your private key
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            <BannedIcon />
            Lost keys cannot be restored
          </li>
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#F0F2F4] text-[#222222]"
        >
          Cancel
        </SecondaryButton>
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#4DAFFF] text-[#FFFFFF]"
        >
          <FaceIDIcon />
          Reveal
        </SecondaryButton>
      </div>
    </div>
  );
}

// ---- RemoveWallet ----
export function RemoveWallet({ setView }: ViewProps) {
  return (
    <div>
      <div className="px-2">
        <Header
          icon={<DangerIcon />}
          title="Are you sure?"
          description="You haven’t backed up your wallet yet. If you remove it, you could lose access forever. We suggest tapping and backing up your wallet first with a valid recovery method."
        />
        <div className="mt-7 flex gap-4">
          <SecondaryButton
            onClick={() => setView("default")}
            className="bg-[#F0F2F4] text-[#222222]"
          >
            Cancel
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setView("default")}
            className="bg-[#FF3F40] text-[#FFFFFF]"
          >
            Continue
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

// ---- DefaultView ----
export function DefaultView({ setView }: ViewProps) {
  return (
    <>
      <header className="mb-4 flex h-[72px] items-center border-b border-[#F7F7F7] pl-2">
        <h2 className="text-[19px] font-semibold text-[#222222] md:font-medium">
          Options
        </h2>
      </header>
      <div className="space-y-3">
        <Button onClick={() => setView("key")}>
          <KeyRound />
          View Private Key
        </Button>
        <Button onClick={() => setView("phrase")}>
          <ScrollText />
          View Recovery Keywords
        </Button>
        <button
          className="focus-visible:shadow-focus-ring-button flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#FFF0F0] px-4 text-[17px] font-semibold text-[#FF3F40] transition-transform focus:scale-95 active:scale-95 md:font-medium"
          onClick={() => setView("remove")}
        >
          <ShieldAlert />
          Delete Wallet
        </button>
      </div>
    </>
  );
}
