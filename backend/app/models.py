from datetime import datetime, timezone

def serialize_event(event):
    return {
        "event_type": event.get("event_type"),
        "page": event.get("page"),
        "source": event.get("source"),
        "timestamp": event.get("timestamp", datetime.now(timezone.utc))
    }
