import { dbConnect } from "../lib/mongo";
import { getDictionary } from "./dictionaries/dictionaries";

export const metadata = {
  title: "Home",
  description: "AirBnb",
};

export default async function LangLayout({ children, auth, params: { lang } }) {
  await dbConnect();
  const dict = await getDictionary(lang);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
