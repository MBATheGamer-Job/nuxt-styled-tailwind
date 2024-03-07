export function getStatusLabel(status: string) {
  if (!status) return;
  const currentStatus = status.toLowerCase();
  switch (currentStatus) {
  case "unknown":
    return "secondary";
  case "invalid":
    return "danger";
  case "risky":
    return "warning";
  case "valid":
    return "success";
  }
}
