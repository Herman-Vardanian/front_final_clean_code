
import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import TagList from "./TagList";
import CardWithAllInfo from "../components/CardWithAllInfo.tsx";
import type {CardDto} from "../api/cardApi.ts";
import {withToast} from "../components/error/errorWrapper.ts";
import {fetchAllCards} from "../api/cardApi.ts";




export default function CardsPage() {
    const [cards, setCards] = useState<CardDto[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            setLoading(true);

            const result = await withToast(fetchAllCards(), {
                errorMessage: "Failed to load cards",
            });

            if (!mounted) return;

            if (result.ok) {
                setCards([...result.data]);
            }

            setLoading(false);
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const filteredCards = useMemo(() => {
        if (selectedTags.length === 0) return cards;
        return cards.filter((c) => c.tag && selectedTags.includes(c.tag));
    }, [cards, selectedTags]);

    if (loading) {
        return (
            <Container sx={{ py: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={18} />
                    <Typography variant="body2">Loading cards…</Typography>
                </Stack>
            </Container>
        );
    }

    if (errorMsg) {
        return (
            <Container sx={{ py: 3 }}>
                <Alert severity="error">{errorMsg}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 3 }}>
            <Stack spacing={2.5}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        Cards
                    </Typography>
                    <Typography variant="body2">
                        Select tags to filter. No selection = all cards.
                    </Typography>
                </Box>

                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <TagList
                        cards={cards}
                        selectedTags={selectedTags}
                        onChangeSelectedTags={setSelectedTags}
                    />
                </Paper>

                <Divider />

                <CardWithAllInfo cards={filteredCards} selectedTags={selectedTags} />
            </Stack>
        </Container>
    );
}
