export class About {
    skills!: string[];
    educations!: Education[];
    certifications!: Certification[]
}

export class Skill {
    id!: number;
    name!: string
}

export class Education {
    institution!: string;
    career!: string;
    startDate!: Date;
    endDate!: Date;
    city!: string;
}

export class Certification {
    name!: string;
    expeditionDate!: Date;
    certifying!: string;
    link!: string;
}