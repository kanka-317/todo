import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";

export function OrderSelect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentOrder = searchParams.get("order") || "asc";

  const handleValueChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("order", value);

    if (!nextParams.get("page")) {
      nextParams.set("page", "1");
    }
    if (!nextParams.get("limit")) {
      nextParams.set("limit", "5");
    }

    navigate(`/tasks?${nextParams.toString()}`);
  };

  return (
    <Select value={currentOrder} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="dsc">Desc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
