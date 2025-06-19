import { auth } from "@/auth";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|tprc)(.*)"],
};

export default auth((req) => {});
