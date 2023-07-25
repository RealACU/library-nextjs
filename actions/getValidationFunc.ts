export default function useValidationFunc(urlType: string) {
  if (urlType === "External Hyperlink") {
    return checkExternalHyperlinkUrl;
  }

  if (urlType === "Host Code") {
    return checkHostCodeUrl;
  }

  if (urlType === "Google Workspace") {
    return checkGoogleWorkspaceUrl;
  }
}

function checkExternalHyperlinkUrl(url: string) {
  // Check for https
  if (!url.startsWith("https://")) {
    return false;
  }

  return true;
}

function checkHostCodeUrl(url: string) {
  // Check for https
  if (!url.startsWith("https://")) {
    return false;
  }

  // Check if url is NOT from glitch, vercel.app, cloudflare pages, github pages, jsdelivr, statically, or quizlet
  const safeDomains =
    /\.glitch\.me|\.vercel\.app|\.pages\.dev|\.github\.io|cdn\.jsdelivr\.net|cdn\.statically\.io|quizlet\.com/;

  if (!safeDomains.test(url)) {
    return false;
  }

  return true;
}

function checkGoogleWorkspaceUrl(url: string) {
  // Check for https
  if (!url.startsWith("https://")) {
    return false;
  }

  // Check for google
  if (!/google\.com/.test(url)) {
    return false;
  }

  return true;
}
