const Section=require('../models/Section')
const SubSection=require('../models/SubSection')
const Course=require('../models/Course')


exports.createSectionCreate=async(req,res)=>{
    try {
        const{sectionName,courseId}=req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'all info are needed'
            })
        }
        const newSection=await Section.create({sectionName});
        const updatedCourseDetail=await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true}).populate("courseContent").exec();
        return res.status(200).json({
            success:true,
            message:'Section created',
            updatedCourseDetail
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Unable to create Section'
        })        
    }
}


exports.updateSection=async(req,res)=>{
    try {
        // console.log(req.body);
        const{sectionName,sectionId,courseId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'all info are needed'
            })
        }
        const section =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        return res.status(200).json({
            success:true,
            message:`section updated ${section}`,
            data:course
        })
    } catch (error) {
        console.log("Error updating section",error);
        return res.status(500).json({
            success:false,
            message:'Unable to update section'
        })
    }
}

exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   