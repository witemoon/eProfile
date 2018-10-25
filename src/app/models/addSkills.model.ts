export interface AddSkillsModel
{ 
    employeeId?:any,
    skillName?:any;
    coreSkillName ?: any;
    skillId:any,  
    coreSkillIds?:any,
    coreSkillRatings?:any,
    coreExpInMonths?:any,
    newSkillSetIds?:any,
    isActiveFlag?:any,
    insightId?:any,
    coreskills:[{
        core_Skill_Experience_in_Months: any,
        core_Skill_Experience_in_Years: any,
        core_Skill_Name: string,
        core_Skill_rating: any,
        core_skillid: number,
        newSkillSetIds: number,
        isSelected:boolean
    }
],
    defaultCoreSkills:any
}
    