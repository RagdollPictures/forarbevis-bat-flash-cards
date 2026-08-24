import { Directory, File, Paths } from "expo-file-system";

function hashString(value: string): string {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

function getFileExtension(url: string): string {
  const cleanUrl = url.split("?")[0].split("#")[0];
  const match = cleanUrl.match(/\.([a-zA-Z0-9]{1,8})$/);

  return match ? `.${match[1].toLowerCase()}` : "";
}

export async function cacheRemoteImage(
  courseId: string,
  remoteUrl: string
): Promise<string> {
  const directory = new Directory(
    Paths.document,
    "content-images",
    courseId
  );

  directory.create({
    idempotent: true,
    intermediates: true,
  });

  const extension = getFileExtension(remoteUrl);
  const filename = `${hashString(remoteUrl)}${extension}`;

  const localFile = new File(directory, filename);

  if (!localFile.exists) {
    await File.downloadFileAsync(
      remoteUrl,
      localFile
    );
  }

  return localFile.uri;
}