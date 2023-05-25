import MeetupList from '../components/meetups/MeetupList'
import { useState, useEffect } from 'react';

function AllMeetupsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://react-meetup-project-86ed4-default-rtdb.firebaseio.com/meetups.json'
        ).then(response => {
            return response.json();
        }).then(data => {
            const meetups = [];
            for (const key in data) {
                const meetup = {
                    id: key,
                    ...data[key]
                }
                meetups.push(meetup);
            }
            setIsLoading(false);
            setLoadedMeetups(meetups);
        })
    }, [])

    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
    else {
        return <section>
            <h1>All Meetups</h1>
            <ul>
                <MeetupList meetups={loadedMeetups} />
            </ul>
        </section>
    }

}

export default AllMeetupsPage;