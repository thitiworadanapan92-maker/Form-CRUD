"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Game, GameStatus } from "@/app/types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type FormErrors = Partial<
  Record<keyof GameDraft, string>
>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    name: game.name,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(
    toDraft(initialGame)
  );

  const [errors, setErrors] =
    useState<FormErrors>({});

  function validate(
    value: GameDraft
  ): FormErrors {
    const nextErrors: FormErrors = {};

    // ตรวจสอบชื่อเกม
    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อเกม";
    }

    // ตรวจสอบแพลตฟอร์ม
    if (value.platform === "") {
      nextErrors.platform =
        "กรุณาเลือกแพลตฟอร์ม";
    }

    // ตรวจสอบจำนวนชั่วโมง
    const hours = Number(value.hours);

    if (
      value.hours.trim() === "" ||
      !Number.isInteger(hours) ||
      hours <= 0
    ) {
      nextErrors.hours =
        "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    // ตรวจสอบสถานะ
    if (!value.status) {
      nextErrors.status =
        "กรุณาเลือกสถานะเกม";
    }

    return nextErrors;
  }

  function handleChange(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ล้าง error ของช่องที่กำลังแก้ไข
    if (errors[name as keyof GameDraft]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const nextErrors = validate(draft);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);

    setDraft(emptyDraft);
    setErrors({});
  }

  const isEditing = Boolean(initialGame);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="game-form"
    >
      <h2>
        {isEditing
          ? "แก้ไขรายการเกม"
          : "เพิ่มเกมที่ต้องการเล่น"}
      </h2>

      {/* ชื่อเกม */}
      <div className="form-group">
        <label htmlFor="name">
          ชื่อเกม
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          placeholder="เช่น Elden Ring"
          aria-invalid={!!errors.name}
          aria-describedby={
            errors.name
              ? "name-error"
              : undefined
          }
        />

        {errors.name ? (
          <p
            id="name-error"
            className="form-error"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      {/* แพลตฟอร์ม */}
      <div className="form-group">
        <label htmlFor="platform">
          แพลตฟอร์ม
        </label>

        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          aria-invalid={!!errors.platform}
          aria-describedby={
            errors.platform
              ? "platform-error"
              : undefined
          }
        >
          <option value="">
            -- เลือกแพลตฟอร์ม --
          </option>
          <option value="PC">PC</option>
          <option value="PS5">PS5</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">
            Nintendo Switch
          </option>
          <option value="Mobile">
            Mobile
          </option>
        </select>

        {errors.platform ? (
          <p
            id="platform-error"
            className="form-error"
          >
            {errors.platform}
          </p>
        ) : null}
      </div>

      {/* จำนวนชั่วโมง */}
      <div className="form-group">
        <label htmlFor="hours">
          จำนวนชั่วโมงที่คาดว่าจะใช้เล่น
        </label>

        <input
          id="hours"
          name="hours"
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          value={draft.hours}
          onChange={handleChange}
          placeholder="เช่น 20"
          aria-invalid={!!errors.hours}
          aria-describedby={
            errors.hours
              ? "hours-error"
              : undefined
          }
        />

        {errors.hours ? (
          <p
            id="hours-error"
            className="form-error"
          >
            {errors.hours}
          </p>
        ) : null}
      </div>

      {/* สถานะ */}
      <div className="form-group">
        <label htmlFor="status">
          สถานะ
        </label>

        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          aria-invalid={!!errors.status}
          aria-describedby={
            errors.status
              ? "status-error"
              : undefined
          }
        >
          <option value="ยังไม่เริ่ม">
            ยังไม่เริ่ม
          </option>

          <option value="กำลังเล่น">
            กำลังเล่น
          </option>

          <option value="เล่นจบแล้ว">
            เล่นจบแล้ว
          </option>
        </select>

        {errors.status ? (
          <p
            id="status-error"
            className="form-error"
          >
            {errors.status}
          </p>
        ) : null}
      </div>

      {/* ปุ่ม */}
      <div className="form-actions">
        <button type="submit">
          {isEditing
            ? "บันทึกการแก้ไข"
            : "เพิ่มเกม"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}