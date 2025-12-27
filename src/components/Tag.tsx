import { Chip } from "@mui/material";

export default function Tag({
                                value,
                                selected,
                                onClick,
                            }: {
    value: string;
    selected?: boolean;
    onClick?: (value: string) => void;
}) {
    return (
        <Chip
            label={value}
            clickable
            onClick={() => onClick?.(value)}
            color={selected ? "primary" : "default"}
            variant={selected ? "filled" : "outlined"}
            size="small"
        />
    );
}
