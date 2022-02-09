import { MongoClient ,ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://negi:512544615@cluster0.zemkh.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const MeetupsCollection = db.collection("meetups");

  const meetups = await MeetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://negi:512544615@cluster0.zemkh.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const MeetupsCollection = db.collection("meetups");

  const selectedMeetups = await MeetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        image: selectedMeetups.image,
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        description: selectedMeetups.description,
      },
    },
    //revalidate: 10
  };
}
export default MeetupDetails;
