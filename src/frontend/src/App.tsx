import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRightLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Gift,
  HelpCircle,
  Landmark,
  QrCode,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Easy-edit variables ──────────────────────────────────────────
const USER_NAME = "Joanderson";
const BALANCE = 2847.5;
const CREDIT_LIMIT = 5000.0;
const CREDIT_USED = 1234.56;
const CREDIT_INVOICE = 1234.56;
const LOAN_AVAILABLE = 12000.0;
const INVESTMENT_TOTAL = 3421.87;
const PIN = "1234";
const PIX_NOTIFICATION_VALUE = "R$ 150,00";
// ──────────────────────────────────────────────────────────────────

type Screen = "login" | "home" | "pix" | "pagar" | "transferir";

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getUserInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const TRANSACTIONS = [
  {
    id: 1,
    name: "Netflix",
    date: "15/03/2026",
    value: -55.9,
    color: "#E50914",
    icon: "N",
  },
  {
    id: 2,
    name: "iFood",
    date: "14/03/2026",
    value: -87.4,
    color: "#EA1D2C",
    icon: "i",
  },
  {
    id: 3,
    name: "Pix recebido · João Pedro",
    date: "13/03/2026",
    value: 200.0,
    color: "#00C88C",
    icon: "P",
  },
  {
    id: 4,
    name: "Pão de Açúcar",
    date: "12/03/2026",
    value: -342.15,
    color: "#E31837",
    icon: "P",
  },
  {
    id: 5,
    name: "Uber",
    date: "11/03/2026",
    value: -23.8,
    color: "#1C1C1C",
    icon: "U",
  },
  {
    id: 6,
    name: "Salário",
    date: "10/03/2026",
    value: 4500.0,
    color: "#22A06B",
    icon: "S",
  },
  {
    id: 7,
    name: "Farmácia Raia",
    date: "09/03/2026",
    value: -45.2,
    color: "#0075C9",
    icon: "R",
  },
  {
    id: 8,
    name: "Spotify",
    date: "08/03/2026",
    value: -21.9,
    color: "#1DB954",
    icon: "S",
  },
];

// ─── Android Notification Banner ─────────────────────────────────
function AndroidNotification({
  visible,
  onDismiss,
}: { visible: boolean; onDismiss: () => void }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDismiss, 4000);
      return () => clearTimeout(t);
    }
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-ocid="notification.toast"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-50 max-w-sm mx-auto"
        >
          <div
            className="mx-3 mt-3 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#820AD1] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs">Nubank</p>
              <p className="text-white/80 text-xs truncate">
                Você recebeu um Pix de {PIX_NOTIFICATION_VALUE}
              </p>
            </div>
            <span className="text-white/40 text-[10px] shrink-0">agora</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── PIN Login Screen ─────────────────────────────────────────────
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const hiddenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => hiddenRef.current?.focus(), 300);
  }, []);

  const processPin = (value: string) => {
    if (value.length === 4) {
      setTimeout(() => {
        if (value === PIN) {
          onSuccess();
        } else {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setPin("");
          }, 600);
        }
      }, 150);
    }
  };

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    processPin(next);
  };

  const handleBackspace = () => setPin((p) => p.slice(0, -1));

  const numpadKeys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"],
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#820AD1] px-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
          <span className="text-white font-bold text-4xl tracking-tight">
            N
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-white/80 text-sm font-medium mb-8 tracking-wide"
      >
        Digite sua senha de 4 dígitos
      </motion.p>

      <motion.div
        data-ocid="login.input"
        className="flex gap-4 mb-10"
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full border-2 border-white"
            animate={{
              backgroundColor:
                i < pin.length
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.1)",
              scale: i < pin.length ? 1.1 : 1,
            }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </motion.div>

      <input
        ref={hiddenRef}
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 4);
          setPin(val);
          processPin(val);
        }}
        className="opacity-0 absolute w-0 h-0 pointer-events-none"
        aria-label="PIN"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-3 gap-3 w-full max-w-[280px]"
      >
        {numpadKeys.flat().map((key, i) => {
          const stableKey =
            key === "" ? `empty-${i}` : key === "⌫" ? "backspace" : key;
          if (key === "") return <div key={stableKey} />;
          return (
            <button
              key={stableKey}
              type="button"
              data-ocid="login.submit_button"
              onClick={() =>
                key === "⌫" ? handleBackspace() : handleDigit(key)
              }
              className="h-16 rounded-2xl bg-white/10 text-white text-2xl font-medium flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
            >
              {key}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Sub-screen: Pix ─────────────────────────────────────────────
function PixScreen({ onBack }: { onBack: () => void }) {
  const [pixKey, setPixKey] = useState("");
  const contacts = [
    {
      name: "João Pedro",
      key: "joao@nubank.com.br",
      initials: "JP",
      color: "#820AD1",
    },
    {
      name: "Maria Silva",
      key: "(11) 99999-0001",
      initials: "MS",
      color: "#009EE3",
    },
    {
      name: "Carlos Lima",
      key: "123.456.789-00",
      initials: "CL",
      color: "#22A06B",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header
        className="px-5 pt-12 pb-5"
        style={{ backgroundColor: "#820AD1" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="pix.button"
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold text-lg">Área Pix</span>
        </div>
      </header>

      <main className="max-w-sm mx-auto px-4 pt-4 pb-20 space-y-3">
        {/* Ações Pix */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-4">
            O que você quer fazer?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Transferir", icon: ArrowRightLeft, color: "#820AD1" },
              { label: "Receber", icon: QrCode, color: "#009EE3" },
              { label: "Cobrar", icon: DollarSign, color: "#22A06B" },
              { label: "Ver chaves", icon: Zap, color: "#F59E0B" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                data-ocid="pix.secondary_button"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <item.icon
                    className="w-4 h-4"
                    style={{ color: item.color }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Campo Chave Pix */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-3">
            Transferir via chave Pix
          </p>
          <div className="flex gap-2">
            <input
              data-ocid="pix.input"
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="CPF, e-mail, telefone ou chave"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors"
            />
            <button
              type="button"
              data-ocid="pix.primary_button"
              className="px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#820AD1" }}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Recentes */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-4">Recentes</p>
          <div className="space-y-0">
            {contacts.map((c, i) => (
              <div key={c.name}>
                <button
                  type="button"
                  data-ocid={`pix.item.${i + 1}`}
                  className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 rounded-xl px-1 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.initials}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400">{c.key}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
                {i < contacts.length - 1 && (
                  <div className="h-px bg-gray-100 ml-13" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* QR Code placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center">
          <p className="font-semibold text-sm text-gray-800 mb-4">
            Meu QR Code Pix
          </p>
          <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
            <QrCode className="w-20 h-20 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 text-center">
            Mostre este QR code para receber um Pix
          </p>
        </div>
      </main>
    </div>
  );
}

// ─── Sub-screen: Pagar ───────────────────────────────────────────
function PagarScreen({ onBack }: { onBack: () => void }) {
  const [barcode, setBarcode] = useState("");

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header
        className="px-5 pt-12 pb-5"
        style={{ backgroundColor: "#820AD1" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="pagar.button"
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold text-lg">Pagar</span>
        </div>
      </header>

      <main className="max-w-sm mx-auto px-4 pt-4 pb-20 space-y-3">
        {/* QR Scanner placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-3">
            Escanear QR Code
          </p>
          <div className="w-full h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2">
            <QrCode className="w-16 h-16 text-gray-400" />
            <p className="text-xs text-gray-400">
              Câmera indisponível no simulador
            </p>
          </div>
        </div>

        {/* Código de barras */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-3">
            Digitar código de barras
          </p>
          <textarea
            data-ocid="pagar.textarea"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Cole ou digite o código de barras aqui..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors resize-none"
          />
          <button
            type="button"
            data-ocid="pagar.primary_button"
            className="w-full mt-3 py-3 rounded-xl text-white text-sm font-semibold transition-colors"
            style={{ backgroundColor: barcode ? "#820AD1" : "#C9A8E8" }}
          >
            Continuar
          </button>
        </div>

        {/* Histórico de pagamentos */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-4">
            Pagamentos recentes
          </p>
          {[
            { name: "CPFL Energia", date: "10/03/2026", value: 189.4 },
            { name: "Condomínio", date: "05/03/2026", value: 620.0 },
            { name: "Internet Vivo", date: "01/03/2026", value: 99.9 },
          ].map((item, i) => (
            <div key={item.name}>
              <div
                data-ocid={`pagar.item.${i + 1}`}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {formatBRL(item.value)}
                </span>
              </div>
              {i < 2 && <div className="h-px bg-gray-100" />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ─── Sub-screen: Transferir ──────────────────────────────────────
function TransferirScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const banks = [
    { id: "nu", name: "Nubank", color: "#820AD1", logo: "N" },
    { id: "itau", name: "Itaú", color: "#FF7600", logo: "I" },
    { id: "bb", name: "Banco do Brasil", color: "#FFCC00", logo: "B" },
    { id: "brad", name: "Bradesco", color: "#CC092F", logo: "B" },
    { id: "cef", name: "Caixa", color: "#005CA9", logo: "C" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header
        className="px-5 pt-12 pb-5"
        style={{ backgroundColor: "#820AD1" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="transferir.button"
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold text-lg">Transferir</span>
        </div>
      </header>

      <main className="max-w-sm mx-auto px-4 pt-4 pb-20 space-y-3">
        {/* Selecionar banco */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-800 mb-4">
            Selecionar banco destino
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {banks.map((bank) => (
              <button
                key={bank.id}
                type="button"
                data-ocid="transferir.secondary_button"
                onClick={() => setSelectedBank(bank.id)}
                className="flex flex-col items-center gap-1.5 shrink-0 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all"
                  style={{
                    backgroundColor: bank.color,
                    boxShadow:
                      selectedBank === bank.id
                        ? `0 0 0 3px ${bank.color}50`
                        : "none",
                  }}
                >
                  {bank.logo}
                </div>
                <span className="text-[10px] text-gray-600 font-medium text-center max-w-[52px] leading-tight">
                  {bank.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dados do destinatário */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <p className="font-semibold text-sm text-gray-800">
            Dados da transferência
          </p>
          <input
            data-ocid="transferir.input"
            type="text"
            placeholder="Nome do favorecido"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors"
          />
          <input
            type="text"
            placeholder="CPF / CNPJ"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Agência"
              className="w-1/3 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors"
            />
            <input
              type="text"
              placeholder="Conta"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
              R$
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/[^0-9,]/g, ""))
              }
              placeholder="0,00"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#820AD1] transition-colors font-bold text-gray-900"
            />
          </div>
          <button
            type="button"
            data-ocid="transferir.primary_button"
            className="w-full py-4 rounded-xl text-white font-bold text-sm transition-colors"
            style={{
              backgroundColor: amount && selectedBank ? "#820AD1" : "#C9A8E8",
            }}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────
function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [balance, setBalance] = useState(BALANCE);
  const [showBalance, setShowBalance] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const creditPct = Math.min(100, (CREDIT_USED / CREDIT_LIMIT) * 100);
  const limitAvailable = CREDIT_LIMIT - CREDIT_USED;
  const firstName = USER_NAME.split(" ")[0];

  const startEdit = () => {
    setEditValue(balance.toFixed(2).replace(".", ","));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 30);
  };

  const saveEdit = () => {
    const num = Number.parseFloat(
      editValue.replace(/\./g, "").replace(",", "."),
    );
    if (!Number.isNaN(num) && num >= 0) setBalance(num);
    setEditing(false);
  };

  const quickActions: {
    id: Screen | "depositar" | "cobrar";
    icon: React.ElementType;
    label: string;
    ocid: string;
  }[] = [
    { id: "pix", icon: Zap, label: "Área Pix", ocid: "action.pix_button" },
    { id: "pagar", icon: QrCode, label: "Pagar", ocid: "action.pay_button" },
    {
      id: "transferir",
      icon: ArrowRightLeft,
      label: "Transferir",
      ocid: "action.transfer_button",
    },
    {
      id: "depositar",
      icon: ArrowDownToLine,
      label: "Depositar",
      ocid: "action.deposit_button",
    },
    {
      id: "cobrar",
      icon: DollarSign,
      label: "Cobrar",
      ocid: "action.cobrar_button",
    },
  ];

  return (
    <div data-ocid="home.page" className="min-h-screen bg-[#F5F5F5]">
      <AndroidNotification
        visible={showNotification}
        onDismiss={() => setShowNotification(false)}
      />

      {/* ── Header ── */}
      <header
        className="px-5 pt-12 pb-6"
        style={{ backgroundColor: "#820AD1" }}
      >
        {/* Row 1: avatar + icons */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            aria-label="Perfil"
            data-ocid="home.button"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#820AD1] font-bold text-sm bg-white"
          >
            {getUserInitials(USER_NAME)}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="balance.toggle"
              aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
              onClick={() => setShowBalance((v) => !v)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {showBalance ? (
                <Eye className="w-5 h-5 text-white" />
              ) : (
                <EyeOff className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              type="button"
              aria-label="Ajuda"
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              aria-label="Convidar"
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Gift className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        {/* Row 2: Greeting */}
        <p className="text-white font-bold text-2xl tracking-tight">
          Olá, {firstName} 👋
        </p>
      </header>

      <main className="max-w-sm mx-auto px-4 pt-3 pb-24 space-y-3">
        {/* ── Account Balance Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                Conta
              </p>
              <p className="text-gray-400 text-xs mb-2">Saldo disponível</p>
              {editing ? (
                <div className="flex items-center gap-1">
                  <span className="text-gray-800 font-bold text-xl">R$</span>
                  <input
                    ref={inputRef}
                    data-ocid="balance.input"
                    type="text"
                    inputMode="decimal"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditing(false);
                    }}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-[#820AD1] outline-none bg-transparent w-full"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={startEdit}
                  className="text-left"
                  title="Clique para editar"
                >
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {showBalance ? formatBRL(balance) : "R$\u00a0•••••"}
                  </span>
                </button>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 mt-6" />
          </div>
        </motion.div>

        {/* ── Quick Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center justify-between overflow-x-auto">
            {quickActions.map(({ id, icon: Icon, label, ocid }) => (
              <button
                key={id}
                type="button"
                data-ocid={ocid}
                onClick={() => {
                  if (id === "pix" || id === "pagar" || id === "transferir") {
                    onNavigate(id);
                  }
                }}
                className="flex flex-col items-center gap-1.5 min-w-[56px]"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F0F0F0" }}
                >
                  <Icon className="w-5 h-5 text-gray-800" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Meus Cartões Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center absolute left-0 top-0">
                <Smartphone className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#820AD1] flex items-center justify-center absolute left-3 top-2">
                <CreditCard className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
            </div>
            <div className="flex-1 pl-2">
              <p className="font-bold text-sm text-gray-900">Meus cartões</p>
              <p className="text-xs text-gray-400">Cartão virtual disponível</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>
        </motion.div>

        {/* ── Cartão de Crédito ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <button type="button" className="w-full" data-ocid="creditcard.card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard
                  className="w-4 h-4 text-gray-600"
                  strokeWidth={1.8}
                />
                <span className="font-semibold text-sm text-gray-800">
                  Cartão de crédito
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 text-left mb-1">Fatura atual</p>
            <p
              className="text-2xl font-bold text-left mb-3"
              style={{ color: "#009EE3" }}
            >
              {formatBRL(CREDIT_INVOICE)}
            </p>
            <Progress value={creditPct} className="h-1.5 nu-progress mb-2" />
            <p className="text-[11px] text-gray-400 text-left">
              {formatBRL(limitAvailable)} disponível de{" "}
              {formatBRL(CREDIT_LIMIT)} limite
            </p>
          </button>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-700">Parcelamentos</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {formatBRL(480.0)}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* ── Empréstimo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gray-600" strokeWidth={1.8} />
              <span className="font-semibold text-sm text-gray-800">
                Empréstimo
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mb-1">Valor pré-aprovado</p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#820AD1" }}>
            {formatBRL(LOAN_AVAILABLE)}
          </p>
          <p className="text-xs" style={{ color: "#820AD1" }}>
            Simule e contrate
          </p>
        </motion.div>

        {/* ── Investimentos ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" strokeWidth={1.8} />
              <span className="font-semibold text-sm text-gray-800">
                Investimentos
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mb-1">Saldo total</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatBRL(INVESTMENT_TOTAL)}
          </p>
          <p className="text-xs text-green-500 font-medium mb-3">
            +R$ 24,50 hoje
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Rendimento do mês</span>
            <span className="text-xs font-semibold text-green-600">+2,34%</span>
          </div>
        </motion.div>

        {/* ── Nu Shopping ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #820AD1 0%, #5a0891 60%, #3b0066 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-white font-bold text-base mb-1">Nu Shopping</p>
              <p className="text-white/70 text-xs mb-4 leading-relaxed">
                Ganhe cashback em lojas parceiras
              </p>
              <button
                type="button"
                data-ocid="shopping.primary_button"
                className="px-5 py-2 rounded-full text-[#820AD1] bg-white text-xs font-bold hover:bg-white/90 transition-colors"
              >
                Ver ofertas
              </button>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
          </div>
          {/* decorative circles */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute -right-2 top-2 w-16 h-16 rounded-full bg-white/5" />
        </motion.div>

        {/* ── Últimas Movimentações ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="bg-white rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-sm text-gray-800">
              Últimas movimentações
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div data-ocid="transactions.list" className="space-y-0">
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id}>
                <div
                  data-ocid={`transactions.item.${i + 1}`}
                  className="flex items-center gap-3 py-3"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: tx.color }}
                  >
                    {tx.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {tx.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{tx.date}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold shrink-0 ${tx.value >= 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {tx.value >= 0 ? "+" : ""}
                    {formatBRL(tx.value)}
                  </span>
                </div>
                {i < TRANSACTIONS.length - 1 && (
                  <div className="h-px bg-gray-100 ml-12" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hidden notification trigger */}
        <div className="text-center pt-2">
          <button
            type="button"
            data-ocid="notification.button"
            onClick={() => setShowNotification(true)}
            className="text-[11px] text-gray-300 hover:text-gray-400 transition-colors"
          >
            Testar notificação
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 text-[11px] text-gray-300">
          © {new Date().getFullYear()}. Feito com ❤️ usando{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#820AD1" }}
          >
            caffeine.ai
          </a>
        </footer>
      </main>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  const handleLoginSuccess = () => setScreen("home");

  return (
    <>
      <Toaster position="top-center" />
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <LoginScreen onSuccess={handleLoginSuccess} />
            </motion.div>
          )}
          {screen === "home" && (
            <motion.div
              key="home"
              initial={{ y: "6%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-6%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <HomeScreen onNavigate={setScreen} />
            </motion.div>
          )}
          {screen === "pix" && (
            <motion.div
              key="pix"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <PixScreen onBack={() => setScreen("home")} />
            </motion.div>
          )}
          {screen === "pagar" && (
            <motion.div
              key="pagar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <PagarScreen onBack={() => setScreen("home")} />
            </motion.div>
          )}
          {screen === "transferir" && (
            <motion.div
              key="transferir"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <TransferirScreen onBack={() => setScreen("home")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
