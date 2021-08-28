package meeting

type Meeting struct {
	Id int `json:"id"`
	MeetingNumber int `json:"meeting_number"`
}

type Service interface {
	CreateMeeting(meetingNumber int) (error, *Meeting)
	GetMeetingByNumber(meetingNumber int) (error, *Meeting)
}
