import { Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import type {CardDto} from "../api/cardApi.ts";


export default function CardWithAllInfo({
                                      cards,
                                      selectedTags,
                                  }: {
    cards: CardDto[];
    selectedTags: string[];
}) {
    return (
        <Stack spacing={1.2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">
                    {cards.length} result{cards.length > 1 ? "s" : ""}
                    {selectedTags.length > 0 ? ` • filtered by ${selectedTags.join(", ")}` : ""}
                </Typography>
            </Stack>

            <Grid container spacing={2}>
                {cards.map((c) => (
                    <Grid item xs={12} md={6} key={c.id}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Stack spacing={1}>
                                <Typography variant="overline" color="text.secondary">
                                    Category {c.category}
                                </Typography>

                                <Typography variant="h6">{c.question}</Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Answer
                                </Typography>
                                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                    {c.answer}
                                </Typography>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Tag
                                    </Typography>
                                    {c.tag ? <Chip size="small" label={c.tag} /> : <Chip size="small" label="none" variant="outlined" />}
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
