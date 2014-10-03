package com.optigra.funnypictures.facade.facade.feedback;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.optigra.funnypictures.facade.converter.Converter;
import com.optigra.funnypictures.facade.resources.feedback.FeedbackResource;
import com.optigra.funnypictures.model.feedback.Feedback;
import com.optigra.funnypictures.service.feedback.FeedbackService;

/**
 * Default implementation of feedback facade.
 * @author ivanursul
 *
 */
@Component("feedbackFacade")
public class DefaultFeedbackFacade implements FeedbackFacade {
	private static final Logger LOG = LoggerFactory.getLogger(DefaultFeedbackFacade.class);
	
	// TODO: IU - Implement
	@Resource(name = "feedbackResourceConverter")
	private Converter<FeedbackResource, Feedback> feedbackResourceConverter;

	// TODO: IU - Implement
	@Resource(name = "feedbackConverter")
	private Converter<Feedback, FeedbackResource> feedbackConverter;
	
	@Resource(name = "feedbackService")
	private FeedbackService feedbackService;
	
	@Override
	public FeedbackResource createFeedback(final FeedbackResource feedbackResource) {
		LOG.info("Creating feedback: {}", feedbackResource);
		Feedback feedback = feedbackResourceConverter.convert(feedbackResource);
		feedbackService.createFeedback(feedback);
		
		return feedbackConverter.convert(feedback);
	}

}
