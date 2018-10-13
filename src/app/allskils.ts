export class Allskils {
    "skillId": number;
    "skillName": string;
    "employeeId": number;
    "coreSkillIds": number;
    "skillVersions": number;
    "coreSkillRatings": number;
    "coreExpInMonths": string;
    "newSkillSetIds": number;
    "isActiveFlag":number;
    "insightId": string;
    "coreExpInYears": any;
    "searchKey": string;
    "employeeName": string;
    "skillLists": [
        {
            "coreSkills": [
                {
                    "newSkillSetIds": number;
                    "core_Skill_Name": string;
                    "core_Skill_rating": string;
                    "core_Skill_Experience_in_Months": number;
                    "core_skillid": number;
                    "selected": boolean;
                },
                {
                    "newSkillSetIds": number;
                    "core_Skill_Name": string;
                    "core_Skill_rating": string;
                    "core_Skill_Experience_in_Months": number;
                    "core_skillid": number;
                    "selected": boolean;
                },
                {
                    "newSkillSetIds": number;
                    "core_Skill_Name": string;
                    "core_Skill_rating": number;
                    "core_Skill_Experience_in_Months": number;
                    "core_skillid": number;
                    "selected": boolean;
                }
            ],
            "skill_id": number;
            "skill_Name": string;
        }
      ]
}