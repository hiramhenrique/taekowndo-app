export type TrainingRecord = {
  id: string;
  variation: string;
  durationSeconds: number;
  durationLabel: string;
  dateIso: string;
  dateLabel: string;
};

type Listener = () => void;

let records: TrainingRecord[] = [];
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function formatDate(date: Date) {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`;
  }

  return `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`;
}

export function addTrainingRecord(input: {
  variation: string;
  durationSeconds: number;
  date?: Date;
}) {
  const date = input.date ?? new Date();

  const nextRecord: TrainingRecord = {
    id: `${date.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    variation: input.variation,
    durationSeconds: Math.max(0, Math.floor(input.durationSeconds)),
    durationLabel: formatDuration(input.durationSeconds),
    dateIso: date.toISOString(),
    dateLabel: formatDate(date),
  };

  records = [nextRecord, ...records];
  notify();
}

export function getTrainingRecordsSnapshot() {
  return records;
}

export function subscribeTrainingRecords(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
