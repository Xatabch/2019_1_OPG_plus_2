const emailRe =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRe = /^[\w.-_@$]{1,14}$/;

export function validEmail(value: string): boolean {
  return emailRe.test(value.toLowerCase());
}

export function validLogin(value: string): boolean {
  return nameRe.test(value.toLowerCase());
}

export function validPassword(value: string): boolean {
  return value.length > 5;
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // clipboard may be unavailable
  }
}
