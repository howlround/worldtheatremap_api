const typeDefs = `
  type Profile {
    _id: String
    profileType: [String]
    name: String
    gender: [String]
    genderOther: [String]
    ethnicityRace: [String]
    selfDefinedRoles: [String]
    foundingYear: String
    orgTypes: [String]
    startDate: String
    endDate: String
    interests: [String]
    about: String
    email: String
    phone: String
    website: String
    agent: String
    facebook: String
    twitter: String
    instagram: String
    social: String
    lat: String
    lon: String
    streetAddress: String
    locality: String
    administrativeArea: String
    country: String
    postalCode: String
    i18n: i18n
    festivals: [FestivalProfiles]
  }

  type FestivalProfiles {
    profile: ReferencedEntity
  }

  type Show {
    _id: String
    name: String
    author: [ReferencedEntity]
    about: String
    interests: [String]
    country: [String]
    languages: [String]
    i18n: i18n
  }

  type Event {
    _id: String
    show: ReferencedEntity
    organizations: ReferencedEntity
    eventType: String
    about: String
    # - Date fields use javascript Date format
    startDate: String
    # - Date fields use javascript Date format
    endDate: String
    lat: String
    lon: String
    country: String
    locality: String
    streetAddress: String
    administrativeArea: String
    postalCode: String
  }

  type Participant {
    profile: ReferencedEntity
    role: String
    event: Event
  }

  # Helpers
  type ReferencedEntity {
    name: String
    _id: String
  }

  # List of possible languages
  type i18n {
    es: i18nFields
  }

  # There are any fields that are translated
  type i18nFields {
    name: String
    about: String
  }

  # Responses
  type FindProfilesResponse {
    profiles: [Profile]
    total: Int
    skip: Int
    limit: Int
  }

  type FindShowsResponse {
    shows: [Show]
    total: Int
    skip: Int
    limit: Int
  }

  type FindEventsResponse {
    events: [Event]
    total: Int
    skip: Int
    limit: Int
  }

  type FindParticipantsResponse {
    participants: [Participant]
    total: Int
    skip: Int
    limit: Int
  }

  # Inputs
  input ProfileFiltersInput {
    # How many records to skip to allow for pagination
    skip: Int
    _id: String
    # Searching on the name field is not case sensitive, matches partial words, and uses case folding for diacritics.
    name: String
    selfDefinedRoles: [String]
    interests: [String]
    orgTypes: [String]
    locality: [String]
    administrativeArea: [String]
    country: [String]
    postalCode: [String]
    gender: [String]
    ethnicityRace: [String]
    # - Date fields on Profiles are optional and only applicable for profileType "Festival"
    # - Date fields use javascript Date format
    # - Passing a date to startsBefore searches for events that start before the date passed
    startsBefore: String
    # - Date fields on Profiles are optional and only applicable for profileType "Festival"
    # - Date fields use javascript Date format
    # - Passing a date to endsAfter searches for events that end after the date passed
    endsAfter: String
  }

  input ShowFiltersInput {
    # How many records to skip to allow for pagination
    skip: Int
    _id: String
    # Searching on the name field is not case sensitive, matches partial words, and uses case folding for diacritics.
    name: String
    author: ReferencedEntityInput
    interests: [String]
    country: [String]
    languages: [String]
  }

  input ReferencedEntityInput {
    # For filtering referenced entities only the _id is accepted
    _id: String
  }

  input EventFiltersInput {
    # How many records to skip to allow for pagination
    skip: Int
    _id: String
    show: ReferencedEntityInput
    organizations: ReferencedEntityInput
    eventType: [String]
    locality: [String]
    administrativeArea: [String]
    country: [String]
    # - Date fields use javascript Date format
    # - Passing a date to startsBefore searches for events that start before the date passed
    startsBefore: String
    # - Date fields use javascript Date format
    # - Passing a date to endsAfter searches for events that end after the date passed
    endsAfter: String
  }

  input ParticipantFiltersInput {
    # How many records to skip to allow for pagination
    skip: Int
    _id: String
    profile: ReferencedEntityInput
    role: String
    event: ParticipantEventFiltersInput
  }

  input ParticipantEventFiltersInput {
    _id: String
    show: ReferencedEntityInput
    organizations: ReferencedEntityInput
  }

  # The schema allows the following queries:
  type Query {
    findProfiles(input: ProfileFiltersInput) : FindProfilesResponse
    findShows(input: ShowFiltersInput) : FindShowsResponse
    findEvents(input: EventFiltersInput) : FindEventsResponse
    findParticipants(input: ParticipantFiltersInput) : FindParticipantsResponse
  }
`;

module.exports = typeDefs;
