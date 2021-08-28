package meeting

import "errors"

type ServiceImpl struct {
	meetingList []Meeting
}

func NewServiceImplementation() *ServiceImpl {
	return &ServiceImpl{
		meetingList: make([]Meeting, 0),
	}
}

func (service *ServiceImpl) meetingWithMeetingNumberAlreadyExists(meetingNumber int) bool {
	for _, meeting := range service.meetingList {
		if meeting.MeetingNumber == meetingNumber {
			return true
		}
	}

	return false
}

func (service *ServiceImpl) CreateMeeting(meetingNumber int) (error, *Meeting) {
	if service.meetingWithMeetingNumberAlreadyExists(meetingNumber) {
		return errors.New("meeting_already_exists"), nil
	}

	newMeeting := Meeting{
		Id: len(service.meetingList),
		MeetingNumber: meetingNumber,
	}

	service.meetingList = append(service.meetingList, newMeeting)

	return nil, &newMeeting
}

func (service *ServiceImpl) GetMeetingByNumber(meetingNumber int) (error, *Meeting) {
	for _, meeting := range service.meetingList {
		if meeting.MeetingNumber == meetingNumber {
			return nil, &meeting
		}
	}

	return  errors.New("meeting_not_found"), nil
}
