export function formatMessageTime(isoString: string): string {
	if (!isoString) return "";
	const instant = Temporal.Instant.from(isoString);

	const zonedDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());

	return zonedDateTime.toLocaleString(undefined, {
		timeStyle: "short",
	});
}
