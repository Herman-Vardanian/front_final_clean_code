import { useMemo } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Tag from "../components/Tag.tsx";

type CardDto = {
    id: string;
    question: string;
    answer: string;
    category: string;
    tag?: string | null;
};

export default function TagList({
                                    cards,
                                    selectedTags,
                                    onChangeSelectedTags,
                                }: {
    cards: CardDto[];
    selectedTags: string[];
    onChangeSelectedTags: (next: string[]) => void;
}) {
    const tags = useMemo(() => {
        const set = new Set<string>();
        for (const c of cards) {
            const t = (c.tag ?? "").trim();
            if (t) set.add(t);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [cards]);

    const toggle = (value: string) => {
        const next = selectedTags.includes(value)
            ? selectedTags.filter((t) => t !== value)
            : [...selectedTags, value];
        onChangeSelectedTags(next);
    };

    const clear = () => onChangeSelectedTags([]);

    return (
        <Stack spacing={1.2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                    Tags
                </Typography>

                <Button size="small" onClick={clear} disabled={selectedTags.length === 0}>
                    Clear
                </Button>
            </Stack>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {tags.map((t) => (
                    <Tag
                        key={t}
                        value={t}
                        selected={selectedTags.includes(t)}
                        onClick={toggle}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
