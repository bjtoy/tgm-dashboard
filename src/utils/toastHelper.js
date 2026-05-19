import { toastRef } from "./toastRef.js";

export function toastSuccess(msg) {
  toastRef.showToast(msg, "success");
}

export function toastError(msg) {
  toastRef.showToast(msg, "error");
}

export function toastInfo(msg) {
  toastRef.showToast(msg, "info");
}

export function toastWarning(msg) {
  toastRef.showToast(msg, "warning");
}
