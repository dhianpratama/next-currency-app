import Image from "next/image";

import { FLAG_MAP } from "@/lib/utils";

export default function Flag({ code }: { code: string }) {
  return (
    <Image
      src={FLAG_MAP[code]}
      alt={`${code} flag`}
      className="w-8 h-6 rounded-sm object-cover"
      width={20}
      height={14}
    />
  );
}
